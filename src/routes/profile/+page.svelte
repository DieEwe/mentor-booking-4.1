<script>
    // Placeholder user data; later, retrieve from seatable.
    let userData = {
      name: 'Admin',
      vorname: 'Admin',
      email: 'admin@example.com'
    };
  
    function updateProfile() {
      // TODO: Implement profile update logic
      alert('Profile updated');
    }
  </script>
  
  <main>
    <h1>Mein Profil</h1>
    <div class="profile-card" role="region" aria-label="User Profile">
      <p><strong>Name:</strong> {userData.name}</p>
      <p><strong>Vorname:</strong> {userData.vorname}</p>
      <p><strong>E-Mailadresse:</strong> {userData.email}</p>
      <!-- More fields can be added as needed -->
      <button on:click={updateProfile}>Update Profile</button>
    </div>
  </main>
  
  <style>
    .profile-card {
      background: #fff;
      padding: 1rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      max-width: 400px;
      margin: auto;
    }
  </style>