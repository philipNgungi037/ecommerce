const Navs = (username, role) => [
    {
        id: 1,
        name: username ? username : 'Account',
        link: username ? (role === 'admin' ? '/admin-dashboard' : '/profile') : '/signin',
        icon: '<ion-icon name="person-outline"></ion-icon>',
        //to be displayed by the account/user dropdown.
        subnavs: [
            { name: 'Orders', link: '/orders' },
            { name: role === 'admin' ? 'Dashboard' : 'Profile', link: role === 'admin' ? '/admin-dashboard' : '/profile' },
            { name: role == 'admin' ? 'Supply' : 'Saved Items', link: '/saved-items' }
        ] 
    },
    {
        id: 2,
        name: 'Cart',
        link: 'cart',
        icon: '<ion-icon name="cart-outline"></ion-icon>',
    },
];
export default Navs;
