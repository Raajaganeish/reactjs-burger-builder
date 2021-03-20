import { useEffect, useState } from "react";

export default (httpClient) => {
  const [errorinHandle, setErrorinHandle] = useState(null);

  const reqInterceptor = httpClient.interceptors.request.use((req) => {
    setErrorinHandle(null);
    return req;
  });
  const resInterceptor = httpClient.interceptors.response.use(
    (res) => {
      return res;
    },
    (err) => {
      console.log(err);
      setErrorinHandle(err.toString());
    }
  );

  useEffect(() => {
    return () => {
      httpClient.interceptors.request.eject(reqInterceptor);
      httpClient.interceptors.response.eject(resInterceptor);
    };
  }, [reqInterceptor, resInterceptor]);

  const errorConfirmedHandler = () => {
    setErrorinHandle(null);
  };

  return [errorinHandle, errorConfirmedHandler];
};
