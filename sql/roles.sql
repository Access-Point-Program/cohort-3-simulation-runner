CREATE ROLE simulation_capstone_admin;
GRANT SELECT, INSERT, DELETE ON simulation_results TO simulation_capstone_admin;
GRANT USAGE, SELECT ON SEQUENCE simulation_results_simulation_results_id_seq TO simulation_capstone_admin;
GRANT simulation_capstone_admin to hocus_pocus_user;