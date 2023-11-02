-- Create the Simulation table
CREATE TABLE Simulation (
    SimulationID SERIAL PRIMARY KEY,
    Iterations INT NOT NULL,
    RobotChoices INT NOT NULL,
    RobotSuccess BOOLEAN NOT NULL,
    DateTime TIMESTAMP NOT NULL,
    Results VARCHAR(255) NOT NULL,
    RulesetID INT,
    LayoutID INT,
    FOREIGN KEY (RulesetID) REFERENCES Ruleset (RulesetID),
    FOREIGN KEY (LayoutID) REFERENCES FactoryLayout (LayoutID)
);

-- Create the API table
CREATE TABLE API (
    APIID SERIAL PRIMARY KEY,
    APIType VARCHAR(50) NOT NULL
);

-- Create the Endpoints table
CREATE TABLE Endpoints (
    EndpointID SERIAL PRIMARY KEY,
    EndpointType VARCHAR(10) NOT NULL,
    EndpointName VARCHAR(255) NOT NULL,
    EndpointURL VARCHAR(255) NOT NULL,
    APIID INT,
    FOREIGN KEY (APIID) REFERENCES API (APIID)
);
