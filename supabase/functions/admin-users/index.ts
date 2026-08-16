// Supabase Edge Function: admin-users
// Deploy: supabase functions deploy admin-users --no-verify-jwt
// (JWT is verified inside using the user access token)

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.1'

const ADMIN_EMAILS = new Set([
  'chetan421301@gmail.com',
  'rahul.kondhalkar77@gmail.com',
])

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

function json(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const anonKey = Deno.env.get('SUPABASE_ANON_KEY')
    const serviceRole = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

    if (!supabaseUrl || !anonKey || !serviceRole) {
      return json(500, { error: 'Missing Supabase environment variables' })
    }

    const authHeader = req.headers.get('Authorization')
    if (!authHeader) return json(401, { error: 'Missing Authorization header' })

    const userClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    })
    const adminClient = createClient(supabaseUrl, serviceRole)

    const {
      data: { user },
      error: userError,
    } = await userClient.auth.getUser()
    if (userError || !user) return json(401, { error: 'Unauthorized' })

    const email = (user.email || '').toLowerCase()
    if (!ADMIN_EMAILS.has(email)) return json(403, { error: 'Admin only' })

    const { data: profile } = await adminClient
      .from('profiles')
      .select('id, role, is_active, email')
      .eq('id', user.id)
      .maybeSingle()

    if (!profile || profile.role !== 'admin' || !profile.is_active) {
      return json(403, { error: 'Admin profile required' })
    }

    const payload = await req.json()
    const action = payload.action

    if (action === 'create') {
      const learnerEmail = String(payload.email || '').trim().toLowerCase()
      const password = String(payload.password || '')
      const fullName = String(payload.full_name || '').trim()
      const phone = String(payload.phone || '').trim()
      const isActive = payload.is_active !== false

      if (!learnerEmail || !password || password.length < 6) {
        return json(400, { error: 'Email and password (min 6 chars) are required' })
      }
      if (ADMIN_EMAILS.has(learnerEmail)) {
        return json(400, { error: 'Cannot create another admin via this endpoint' })
      }

      const { data: created, error: createError } = await adminClient.auth.admin.createUser({
        email: learnerEmail,
        password,
        email_confirm: true,
        user_metadata: { full_name: fullName, phone },
      })
      if (createError) return json(400, { error: createError.message })

      const { error: profileError } = await adminClient.from('profiles').upsert({
        id: created.user.id,
        email: learnerEmail,
        full_name: fullName,
        phone,
        role: 'learner',
        is_active: isActive,
        created_by: user.id,
      })
      if (profileError) return json(400, { error: profileError.message })

      return json(200, { user: { id: created.user.id, email: learnerEmail } })
    }

    if (action === 'update') {
      const id = String(payload.id || '')
      if (!id) return json(400, { error: 'User id required' })

      const updates = {}
      if (typeof payload.full_name === 'string') updates.full_name = payload.full_name.trim()
      if (typeof payload.phone === 'string') updates.phone = payload.phone.trim()
      if (typeof payload.is_active === 'boolean') updates.is_active = payload.is_active

      const { data: existing } = await adminClient
        .from('profiles')
        .select('id, role, email')
        .eq('id', id)
        .maybeSingle()
      if (!existing) return json(404, { error: 'User not found' })
      if (existing.role === 'admin') {
        // Allow admins to update their own name/phone, but not deactivate other admin
        if (typeof payload.is_active === 'boolean' && id !== user.id) {
          return json(400, { error: 'Cannot deactivate another admin' })
        }
      }

      const { error: updateError } = await adminClient.from('profiles').update(updates).eq('id', id)
      if (updateError) return json(400, { error: updateError.message })

      if (payload.password) {
        const password = String(payload.password)
        if (password.length < 6) return json(400, { error: 'Password must be at least 6 characters' })
        const { error: pwError } = await adminClient.auth.admin.updateUserById(id, { password })
        if (pwError) return json(400, { error: pwError.message })
      }

      return json(200, { ok: true })
    }

    if (action === 'delete') {
      const id = String(payload.id || '')
      if (!id) return json(400, { error: 'User id required' })
      if (id === user.id) return json(400, { error: 'Cannot delete your own account' })

      const { data: existing } = await adminClient
        .from('profiles')
        .select('id, role')
        .eq('id', id)
        .maybeSingle()
      if (!existing) return json(404, { error: 'User not found' })
      if (existing.role === 'admin') return json(400, { error: 'Cannot delete admin accounts' })

      const { error: deleteError } = await adminClient.auth.admin.deleteUser(id)
      if (deleteError) return json(400, { error: deleteError.message })

      return json(200, { ok: true })
    }

    return json(400, { error: 'Unknown action' })
  } catch (error) {
    return json(500, { error: error?.message || 'Unexpected error' })
  }
})
