-- Run this in Supabase SQL Editor to create atomic increment function
-- This prevents race conditions when multiple users download at the same time

CREATE OR REPLACE FUNCTION increment_download(note_id BIGINT)
RETURNS void AS $$
BEGIN
  UPDATE notes 
  SET downloads = COALESCE(downloads, 0) + 1 
  WHERE id = note_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to anonymous users (public access)
GRANT EXECUTE ON FUNCTION increment_download(BIGINT) TO anon;
GRANT EXECUTE ON FUNCTION increment_download(BIGINT) TO authenticated;
