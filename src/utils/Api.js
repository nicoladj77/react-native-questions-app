import Config from 'react-native-config/index';
import WithQuery from 'with-query';

class Api {
  static fetchQuestions(difficulty) {
    const url = WithQuery(Config.API_URL, {
      type: 'boolean',
      amount: 10,
      difficulty,
    });

    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => res.json())
      .then(data => (data.results))
      .catch(ex => ({ ex }));
  }
}

export default Api;
