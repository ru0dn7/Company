<?
    session_start();
    
    unset($_SESSION['userid']); // 세션변수 삭제 - > 로그아웃
    unset($_SESSION['username']);
    unset($_SESSION['usernick']);
    unset($_SESSION['userlevel']);

    echo("
        <script>
            location.href = '../index.html'; 
        </script>
    ");
?>