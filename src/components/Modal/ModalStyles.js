import { css } from '@emotion/css';

export const ModalBackdropStyles = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContentStyles = css`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 900px;
  height: 600px;
  background-color: #fff;
  overflow: hidden;
`;

export const ModalImageStyles = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
