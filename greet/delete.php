<?
    session_start();
    @extract($_POST);
    @extract($_GET);
    @extract($_SESSION);

    // $num (프라이머리 값)
    // $page
    // $liststyle

    include "../lib/dbconn.php"; // db 연결

    $sql = "delete from greet where num = $num";
    mysqli_query( $connect, $sql);

    mysqli_close($connect); 

    echo "
        <script>
            location.href = 'list.php?page=$page&liststyle=$liststyle';
        </script>
    ";
?>