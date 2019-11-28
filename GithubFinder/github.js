class GitHub {
  constructor() {
    this.client_id = '8cd63b808155ad1ecb61';
    this.client_secret = 'ea5a97037993af53df861d593d1183e020b0b681';
    this.repos_count = 5;
    this.repos_sort = 'created:asc';
  }

  async getUser(user) {
    const profileResponse = await fetch(
      `https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`
    );

    const repoResponse = await fetch(
      `https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`
    );

    const profile = await profileResponse.json();
    const repos = await repoResponse.json();

    return {
      profile,
      repos
    };
  }
}
