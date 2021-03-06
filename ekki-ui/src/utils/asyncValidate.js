import performRequest from '../configAxios';

const emailError = { email: 'Usuário não encontrado', destination: 'Usuário não encontrado' };

const asyncValidate = values =>
  performRequest(
    'GET',
    `/user?username=${values.email !== undefined ? values.email : values.destination}`,
    null,
    true
  )
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
      throw emailError;
    });

export default asyncValidate;
