import axios from 'axios';
import { DELETE_PHOTO, ALL_PHOTOS, FIRST_PHOTOS,
  MORE_PHOTOS, SINGLE_VIEW, NULL_PHOTO, SELECTED_UPLOADER } from './types';
import { returnErrors } from './errorActions';
import { tokenConfig } from './authActions';

export const firstPhotos = () => dispatch => {
  axios
    .get('/api/items')
    .then(res =>
      dispatch({
        type: FIRST_PHOTOS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
}

export const morePhotos = count => dispatch => {
  axios
    .get('/api/items')
    .then(res =>
      dispatch({
        type: MORE_PHOTOS,
        payload: [res.data, { count }]
      }))
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
}
export const allPhotos = () => dispatch => {
  axios
    .get('/api/items')
    .then(res =>
      dispatch({
        type: ALL_PHOTOS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
}
export const deletePhoto = (filename) => (dispatch, getState) => {
  axios
    .delete(`/api/items/${filename}`, tokenConfig(getState))
    .then(
      dispatch({
        type: DELETE_PHOTO,
        payload: filename
      })
    )
  .catch(err =>
    dispatch(returnErrors(err.response.data, err.response.status))
  );
}

export const uploadHandlerer = file => (dispatch, getState) => {
    const fd = new FormData();
    fd.append('file', file, file.name)
    axios
      .post('/api/items/upload', fd, tokenConfig(getState))
      .then(res =>
        // console.log(res.data)
        dispatch({
          type: SELECTED_UPLOADER,
          payload: res.data.file
        })
      )
  .catch(err =>
    dispatch(returnErrors(err.response.data, err.response.status))
  );
}

export const singleView = file => (dispatch) => {
  axios
  .get('/api/items')
  .then(res =>
    dispatch({
      type: SINGLE_VIEW,
      payload: [res.data, { file }]
    })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );}

// export const nullPhoto = file => (dispatch) => {
//   axios
//   .get('/api/items')
//   .then(res =>
//     dispatch({
//       type: NULL_PHOTO,
//       payload: [res.data]
//     })
//   )
// }

export const nullPhoto = () => ({ type: NULL_PHOTO});
