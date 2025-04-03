import {ReactComponent as ShoppingIcon} from '../../assests/shopping-bag.svg';
import { CartContext } from '../../contexts/cart.context';
import './cart-icon.styles.scss';
import { useContext } from 'react';

const CartIcon = () => {
    const {isCartOpen, setIsCartOpen, cartCount} = useContext(CartContext);
    const toggle = ()=> setIsCartOpen(!isCartOpen);
    return(
        <div className='cart-icon-container' onClick={toggle}>
            <ShoppingIcon className='shopping-icon'/>
            <span className='item-count'>{cartCount}</span>
        </div>
    );
};
export default CartIcon;