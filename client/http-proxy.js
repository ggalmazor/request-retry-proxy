const modes = {
  working: 'working',
  reauthenticating: 'reauthenticating'
};

const maxAttempts = 4;

export default ($http, $q) => {
  let mode = modes.working;

  const reauthenticate = () => {
    mode = modes.reauthenticating;
    $http.get("http://localhost:9091/reauthenticate")
        .then(() => mode = modes.working);
  };

  const retry = (url, d, attempt) => {
    setTimeout(
        () => doGet(url, d, attempt),
        Math.pow(2, attempt) * 10
    );
  };

  const doGet = (url, d, attempt) => $http.get(url)
      .then(
          response => d.resolve(response),
          error => {
            if (mode === modes.working)
              reauthenticate();
            if (++attempt > maxAttempts) {
              console.warn("Max attempts for this call have been reached");
              d.reject(error);
            }
            else
              return retry(url, d, ++attempt);
          }
      );

  const get = url => {
    const d = $q.defer();

    doGet(url, d, 1);

    return d.promise;
  };

  return {get};
}