export default function AsideLogin() {
    const btnstyle ={
       align_self: 'center',
       width: '100%',
        height: '400%',
    };
    const ClickLogin = () => {
        document.location.href = "/login";
      }
    return (
        <>
        <div class="container">
            <div class="row py-5">
                <div class="col-sm">
                    <button type="button" class="btn btn-primary btn-lg btn-block" style={btnstyle} onClick={ClickLogin} >Login</button>
                </div>
            </div>
        </div>


        
        </>
    );

}