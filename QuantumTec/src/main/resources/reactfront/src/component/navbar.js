import '../App.css';
export default function Navbar() {
    const truelogin = false;
    const username = 'test';
    const ClickLogin = () => {
        document.location.href = "/login";
      }
           return (
            <div>
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <div class="container px-4 px-lg-5">
                        {/*로고(클릭시 메인화면)*/}
                        <a class="navbar-brand" href="/">로고 위치(상표)</a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                             {/*카테고리*/}
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4 navbar-nav-right">
                                <li class="nav-item"><a class="nav-link active" aria-current="page" href="/">Home</a></li>
                                <li class="nav-item"><a class="nav-link" href="#!">About</a></li>
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Shop</a>
                                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li><a class="dropdown-item" href="#!">All Products</a></li>
                                        <li><hr class="dropdown-divider" /></li>
                                        <li><a class="dropdown-item" href="#!">Popular Items</a></li>
                                        <li><a class="dropdown-item" href="#!">New Arrivals</a></li>
                                    </ul>
                                </li>
                            </ul>
                            {/*우측 상단에 넣을수 있는 자리(필요시 로그인버튼을 간소화할떄 쓸 위치)*/}
                            <form class="d-flex">
                                {!truelogin && <button class="btn btn-outline-dark" type="button" onClick={ClickLogin} >
                                <i class="loginbtn me-1"></i>
                                    로그인
                                </button>}
                                {truelogin && <button class="btn btn-outline-dark" type="submit">
                                <i class="userbtn me-1"></i>
                                    {username}
                                </button>}
                            </form>       

                        </div>
                    </div>
                </nav>
            </div>
        );
    }