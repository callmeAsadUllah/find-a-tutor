const API_BASE_URL = 'http://localhost:11914';

// Handle login
if (document.getElementById('login-form')) {
  document
    .getElementById('login-form')
    .addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      try {
        const response = await axios.post(
          `${API_BASE_URL}/auth/login`,
          { email, password },
          { withCredentials: true }, // Allows cookies to be sent/received
        );

        // Store access token in localStorage
        localStorage.setItem('accessToken', response.data.accessToken);

        // Feedback to the user
        document.getElementById('message').innerText = 'Login successful!';
        document.getElementById('message').className =
          'text-green-600 text-center mt-4';
      } catch (error) {
        document.getElementById('message').innerText =
          error.response?.data?.message || 'Login failed.';
        document.getElementById('message').className =
          'text-red-600 text-center mt-4';
      }
    });
}

// Handle Twilio token generation
if (document.getElementById('twilio-form')) {
  document
    .getElementById('twilio-form')
    .addEventListener('submit', async (e) => {
      e.preventDefault();
      const identity = document.getElementById('identity').value;
      const roomName = document.getElementById('roomName').value;
      try {
        const response = await axios.post(
          `${API_BASE_URL}/twilio/access-token`,
          { identity, roomName },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
          },
        );
        document.getElementById('token-output').innerText =
          `Token: ${response.data.token}`;
      } catch (error) {
        document.getElementById('token-output').innerText =
          error.response?.data?.message || 'Failed to generate token.';
      }
    });
}

// Handle profile fetching
if (document.getElementById('get-profile')) {
  document.getElementById('get-profile').addEventListener('click', async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/user/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      document.getElementById('profile-output').innerText = JSON.stringify(
        response.data.user,
        null,
        2,
      );
    } catch (error) {
      document.getElementById('profile-output').innerText =
        error.response?.data?.message || 'Failed to fetch profile.';
    }
  });
}
