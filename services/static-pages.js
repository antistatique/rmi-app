class StaticPagesService {
  /**
   * Retrieve static page content
   * @param {*} options contains endpoint and queryparams
   */
  static getStaticPage(slug = '') {
    return new Promise((resolve, reject) => {
      fetch(`${process.env.API_URL}/static-pages?filter[slug]=${slug}`, {
        method: 'GET',
        headers: { Authorization: process.env.API_TOKEN }
      })
        .then((response) => {
          const { status, statusText } = response;

          if (status === 200) return response.json();

          const errorObject = {
            errors: {
              status,
              details: statusText
            }
          };
          throw errorObject;
        })
        .then(data => resolve(data))
        .catch(errors => reject(errors));
    });
  }
}

export default StaticPagesService;
