import './HeaderMenu.css';
import { useAppSelector } from '../../redux/redux-hooks';
import HeaderAuthMenu from './HeaderAuthMenu';
import HeaderUserMenu from './HeaderUserMenu';
import { useDispatch } from 'react-redux';
import { login } from "../../redux/slices/userSlice";

function HeaderMenu() {
  const state = useAppSelector(state => state);
  const dispatch = useDispatch()

  if(localStorage.getItem('userId')) {
    dispatch(login({
      userId: localStorage.getItem('userId')
    }))
  }
    
  if (state.user.user.userId !== undefined) {
    return <HeaderUserMenu/>;
  }
  return <HeaderAuthMenu/>;
}

export default HeaderMenu;