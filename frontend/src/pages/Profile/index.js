import React from 'react';
import "./style.css";

function Profile() {
    return (
        <div className="profile-interface">
            <div className="profile">
                <div className="profile-header">
                    <img src="https://media-exp1.licdn.com/dms/image/C4D03AQHm6hnYZK5Yzw/profile-displayphoto-shrink_200_200/0?e=1588204800&v=beta&t=51pSXN0y-qtoEoqhhMp6_m5XAlQpDIqbqxrXdGoHhx0" alt=""/>
                </div>
                <div className="profile-body">
                    <span>Software Engineering Student / UnB</span>
                    <h5>Maicon Mares</h5>
                    <p id="profile-description"> 
                        Passionate about all things involving technology. Currently, focused in become
                        a professional Full Stack developer.</p>
                </div>
                <div className="profile-footer">
                    <div className="techs">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png" alt=""/>
                        <img src="https://www.pinclipart.com/picdir/middle/102-1024697_related-wallpapers-node-js-logo-png-clipart.png" alt=""/>
                        <img src="https://images.vexels.com/media/users/3/166382/isolated/preview/1ad81b62ad0ec81a584bc22016fd016f-linguagem-de-programa----o-html-plana-by-vexels.png" alt=""/>
                        <img src="https://pngimage.net/wp-content/uploads/2018/05/css-png-1.png" alt=""/>
                        <img id="js-tech" src="https://cdn.pixabay.com/photo/2015/04/23/17/41/javascript-736400_960_720.png" alt=""/>
                    </div>
                    <a href="https://www.linkedin.com/in/maicon-mares/" target="_blank" rel="noopener noreferrer">
                        FOLLOW
                    </a>
                </div>
            </div>
            <div className="profile-social-medias">
                <div className="facebook midia">
                    <a className="midia-link" href="https://www.facebook.com/maiconlucas.mares" target="_blank" rel="noopener noreferrer">
                        <img src="https://www.facebook.com/images/fb_icon_325x325.png" alt=""/>
                    </a>
                    <a href="https://www.facebook.com/maiconlucas.mares" target="_blank" rel="noopener noreferrer">
                        <span>facebook.com/maiconlucas.mares</span>
                    </a>
                </div>
                <div className="twitter midia">
                    <a className="midia-link" href="https://twitter.com/MaiconLucas19" target="_blank" rel="noopener noreferrer">
                        <img src="https://lh3.googleusercontent.com/proxy/Rhzg967WzKRns9wpI8Gw7Ikh30B-oCcP0kStEa-2Ygh8AeC2gVCOuuGssPhLtOn_vzV73yb1dyE5rjvOHg83QeeTajNZBCc39CzlUOEExIu6hIzI3LGIQH7D1sXr3CRNBg" alt=""/>
                    </a>
                    <a href="https://twitter.com/MaiconLucas19" target="_blank" rel="noopener noreferrer">
                        <span>twitter.com/MaiconLucas19</span>
                    </a>
                </div>
                <div className="instagram midia">
                    <a className="midia-link" href="https://www.instagram.com/maicon_mares/" target="_blank" rel="noopener noreferrer">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/58/Instagram-Icon.png" alt=""/>
                    </a>
                    <a href="https://www.instagram.com/maicon_mares/" target="_blank" rel="noopener noreferrer">
                        <span>instagram.com/maicon_mares/</span>
                    </a>
                </div>
                <div className="github midia">
                    <a className="midia-link" href="https://github.com/MaiconMares" target="_blank" rel="noopener noreferrer">
                        <img src="https://image.flaticon.com/icons/svg/25/25231.svg" alt=""/>
                    </a>
                    <a href="https://github.com/MaiconMares" target="_blank" rel="noopener noreferrer">
                        <span>github.com/MaiconMares</span>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Profile;