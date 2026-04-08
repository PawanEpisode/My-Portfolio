-- Only block role changes when the row owner updates their own profile via the API.
-- Dashboard SQL / postgres (auth.uid() IS NULL) can still promote users to author.

CREATE OR REPLACE FUNCTION public.prevent_profile_role_escalation()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF TG_OP = 'UPDATE'
     AND NEW.role IS DISTINCT FROM OLD.role
     AND auth.uid() IS NOT NULL
     AND auth.uid() = NEW.id
  THEN
    RAISE EXCEPTION 'profile role cannot be changed via API';
  END IF;
  RETURN NEW;
END;
$$;
