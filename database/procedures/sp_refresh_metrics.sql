CREATE OR REPLACE PROCEDURE sales.sp_refresh_metrics()
LANGUAGE plpgsql
AS $$
BEGIN

    RAISE NOTICE 'Metrics refreshed';

END;
$$;