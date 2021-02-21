const app = new Vue({
  el: '#app',
  data: {
    url: '',
    slug: '',
    errorMessage: '',
    formVisible: true,
    created: null,
  },
  methods: {
    async createUrl() {
      this.errorMessage = '';
      const response = await fetch('/url', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          url: this.url,
          slug: this.slug || undefined,
        }),
      });
      if (response.ok) {
        const result = await response.json();
        this.formVisible = false;
        this.created = `${window.location.origin}/${result.slug}`;
      } else if (response.status === 429) {
        this.errorMessage =
          'You are sending too many requests. Try again in 30 seconds.';
      } else {
        const result = await response.json();
        this.errorMessage = result.message;
      }
    },
    tryAgain() {
      this.created = false;
      this.url = '';
      this.slug = '';
      this.errorMessage = '';
      this.formVisible = true;
    },
  },
});
