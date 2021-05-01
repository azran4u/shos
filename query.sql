CREATE TABLE IF NOT EXISTS shos.users (
    upn varchar(50) PRIMARY KEY,
    repId varchar(50) NOT NULL,
    groupId varchar(50)[]
);

CREATE TABLE IF NOT EXISTS shos.users_groups (
    upn varchar(50) NOT NULL,
    groupId varchar(50) NOT NULL,
    PRIMARY KEY (upn, groupId)
);

CREATE TABLE IF NOT EXISTS shos.groups (
    groupId varchar(50) PRIMARY KEY,
    subGroupId varchar(50)
);

CREATE TABLE IF NOT EXISTS shos.entity (
    id varchar(50) PRIMARY KEY,
    groupIds varchar(50)[]
);

DELETE FROM shos.users
WHERE upn = 'upn1';

DELETE FROM shos.users
WHERE upn = 'upn2';

DELETE FROM shos.users
WHERE upn = 'upn3';

INSERT INTO shos.users
    VALUES ('upn1', 'repid1', '{g1,g2, g3}');

INSERT INTO shos.users
    VALUES ('upn2', 'repid2', '{g2,g3, g4}');

INSERT INTO shos.users
    VALUES ('upn3', 'repid3', '{g1,g5}');

DELETE FROM shos.entity
WHERE id = 'entity1';

DELETE FROM shos.entity
WHERE id = 'entity2';

INSERT INTO shos.entity
    VALUES ('entity1', '{g1,g2}');

INSERT INTO shos.entity
    VALUES ('entity2', '{g3,g4}');

SELECT
    *
FROM
    shos.entity
WHERE (
    SELECT
        groupId
    FROM
        shos.users
    WHERE
        upn = 'upn3') && shos.entity.groupIds
