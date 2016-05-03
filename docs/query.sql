SELECT Person.NAME as name,Person.VORNAME, Person.HAUPTNR as person_id,  Auszeichnung.INSTITUTION_NAMENSSUCHE, Auszeichnung.HAUPTNR as prize_id, Auszeichnung.JAHR 
FROM Auszeichnung
INNER JOIN Person
ON Person.HAUPTNR=Auszeichnung.KUENSTLER_HAUPTNR