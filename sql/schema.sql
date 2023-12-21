-- Create the "simulation_results" Table
CREATE TABLE public.simulation_results (
    simulation_results_id bigserial,
    ruleset_id bigint,
    layout_id bigint,
    max_iterations integer,
    actual_iterations integer,
    created_date timestamp with time zone,
    pass boolean
);