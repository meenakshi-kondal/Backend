import express from 'express';
import fetch from 'isomorphic-fetch';

const router = express.Router();

router.route('/')
  .get((req, res) => {
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&response_type=code&scope=profile email`;
    res.redirect(url);
  })

  .post(async (req, res) => {
    try {
      const { code } = req.query;
      const url = `https://oauth2.googleapis.com/token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${code}&redirect_uri=${process.env.REDIRECT_URI}&grant_type=authorization_code`;

      const data = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      const responseData = await data.json();

      if (responseData.access_token) {
        const { access_token } = responseData;

        // Use access_token or id_token to fetch user profile
        const infoURL = 'https://www.googleapis.com/oauth2/v1/userinfo';
        const headers = {
          Authorization: `Bearer ${access_token}`,
        };

        const result = await fetch(infoURL, {
          method: 'GET',
          headers: headers,
        });

        const userProfile = await result.json();
        console.log({ userProfile });
      } else {
        console.log('access is denied')
      }
      res.send(responseData);
    } catch (error) {
      console.log('inside catch error', error)
    }
  });

export default router;