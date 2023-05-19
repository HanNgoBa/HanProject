import "../ChangePass/styleChangePass.css"


const ChangePass=() => {

    let pass= document.getElementById('password')
    let newpass= document.getElementById('newpassword')
    let cfpass= document.getElementById('confirmPassword')
    const clickCHangePass =async (e) =>{
        // const reponse = await axios.post('http://localhost:1337/api/theo-dois',{
          
        //     "password": pass,
        //     "currentPassword": idKhachHang,
        //     "passwordConfirmation":   [idTruyen1],
            
          
         
        // })
    }
    return(
        <div className="mainDiv">
            <div className="cardStyle">
            <form action="" method="post" name="signupForm" id="signupForm">
                
                <img src="" id="signupLogo"/>
                
                <h2 className="formTitle">
                Login to your account
                </h2>
                
                <div className="inputDiv">
                    <label className="inputLabel" for="password">Mật khẩu hiện tại</label>
                    <input type="password" id="password" name="password" required></input>
                </div>
            <div className="inputDiv">
                <label className="inputLabel" for="password">Mật khẩu mới</label>
                <input type="password" id="newpassword" name="password" required></input>
            </div>
                
            <div className="inputDiv">
                <label className="inputLabel" for="confirmPassword">Nhập lại mật khẩu</label>
                <input type="password" id="confirmPassword" name="confirmPassword"></input>
            </div>
            
            <div className="buttonWrapper">
                <button type="submit" id="submitButton" onClick={clickCHangePass()} className="submitButton pure-button pure-button-primary">
                <span>Continue</span>
                
                </button>
            </div>
                
            </form>
            </div>
        </div>
    )
}

export default ChangePass