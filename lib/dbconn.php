<?
    $connect=mysqli_connect( "localhost", "kkw", "1234", "kkw_db") or  
        die( "SQL server에 연결할 수 없습니다.");

        mysqli_select_db($connect , "kkw_db");
?>