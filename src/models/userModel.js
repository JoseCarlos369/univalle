export const findUserByAcademicEmail = async (academicEmail, client) => {
  const result = await client.query(`
    SELECT u.*, i.*, s.*
    FROM Users u
    JOIN Institution i ON u.id = i.UserId
    JOIN Sede s ON u.SedeId = s.id
    WHERE i.AcademicEmail = $1
  `, [academicEmail]);
  return result.rows[0];
};