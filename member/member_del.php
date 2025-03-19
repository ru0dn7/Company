<?
    session_start();

    // $_SESSION['userid']
    // $_SESSION['username']
    // $_SESSION['usernick']
    // $_SESSION['userlevel']

    @extract($_POST);
    @extract($_GET);
    @extract($_SESSION);
?>
<meta charset="utf-8">
<?
    include "../lib/dbconn.php";       // dconn.php 파일을 불러옴

    $sql = "delete from member where id='$userid'"; // 삭제
    mysqli_query( $connect, $sql);  // $sql 에 저장된 명령 실행

    // 세션변수 삭제
    unset($_SESSION['userid']); // 세션변수 삭제 - > 로그아웃
    unset($_SESSION['username']);
    unset($_SESSION['usernick']);
    unset($_SESSION['userlevel']);

    mysqli_close($connect);                // DB 연결 끊기
    
    echo "
        <script>
            window.alert('회원탈퇴 되었습니다.');
            location.href = '../index.html';
        </script>
    ";
?>