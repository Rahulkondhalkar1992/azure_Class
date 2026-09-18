ASSIGNMENT 05 — Setup (Archive stale files)
==========================================
Upload landing/raw/* to /landing/raw/

lastModified tip for lab:
1) First upload the two file_old_*.csv files.
2) Wait, OR for demo set pipeline parameter RetentionDays = 0
   to archive everything, then set RetentionDays = 365 to archive nothing.
3) Preferred demo: upload old_* files earlier / previous day if possible.
4) Stretch: also support UseNameFlag to archive when name contains '_old_'.

Target archive path: /archive/raw/yyyy/MM/
Then Delete from landing.

Activities: Get Metadata, Filter, ForEach, If, Copy, Delete
