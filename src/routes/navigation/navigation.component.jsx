import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext} from "react";
import {ReactComponent as CrwnLogo} from '../../assests/crown.svg';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import { CartContext } from "../../contexts/cart.context";
import './navigation.styles.scss';

const Navigation = ()=>{
    const {currentUser} = useContext(UserContext);
    const {isCartOpen} = useContext(CartContext);
    
    const signOutHandler = async () =>{
        await signOutUser();
    }
    return(
      <Fragment>
        <div className="navigation">
            <Link className="logo-container" to='/'>
            <CrwnLogo className='logo'/>
            </Link>
            <div className="nav-links-container">
                <Link className='nav-link' to='/shop'>
                    SHOP
                </Link>
                {currentUser ? (
                        <Link className="nav-link" onClick={signOutHandler}>SIGN OUT</Link>
                    ) : (<Link className='nav-link' to='/auth'>
                        Sign In
                    </Link>
                )}
                <CartIcon/>
            </div>
            {isCartOpen && <CartDropdown/>}
        </div>
        <Outlet/> 
      </Fragment>
    );
};

export default Navigation;