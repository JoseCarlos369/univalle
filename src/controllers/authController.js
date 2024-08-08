import jwt from 'jsonwebtoken';
import { findUserByAcademicEmail } from '../models/userModel.js';

export const login = async (req, res) => {
  const { academicEmail, password } = req.body;
  const client = req.dbClient;

  try {
    const user = await findUserByAcademicEmail(academicEmail, client);

    if (user && password === user.passwordhash) {
      const tokenPayload = {
        id: user.id,
        academicEmail: user.academicemail,
        firstName: user.firstname,
        lastName: user.lastname,
        secondLastName: user.secondlastname,
        birthDate: user.birthdate,
        ci: user.ci,
        email: user.email,
        cellPhone: user.cellphone,
        address: user.address,
        status: user.status,
        sede: {
          id: user.sedeid,
          departament: user.departament
        },
        institution: {
          id: user.institutionid,
          name: user.name,
          campus: user.campus,
          academicGrade: user.academicgrade,
          academicEmail: user.academicemail,
          semester: user.semester
        }
      };

      const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '15m' });

      res.json({ token });
    } else {
      res.status(401).json({ error: 'Credenciales incorrectas' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};