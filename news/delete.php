<?
    session_start();
    @extract($_POST);
    @extract($_GET);
    @extract($_SESSION);
    //$table, $num, $liststyle, 세션변수

    include "../lib/dbconn.php"; 

    $sql = "select * from $table where num = $num";
    $result = mysqli_query( $connect, $sql);

    $row =mysqli_fetch_array($result);

    $copied_name[0] = $row[file_copied_0];  // 카피된 파일들
    $copied_name[1] = $row[file_copied_1];
    $copied_name[2] = $row[file_copied_2];

    for ($i=0; $i<3; $i++)  //업로드된 파일 삭제
    {
        if ($copied_name[$i]) // 첨부된 파일이 있으면
        {
            $image_name = "./data/".$copied_name[$i];
            unlink($image_name);
            //unlink(업드로된 파일경로 파일명); => 파일삭제
        }
    }

    $sql = "delete from $table where num = $num";
    mysqli_query( $connect, $sql);

    mysqli_close($connect);   

    echo "
        <script>
            location.href = 'list.php?table=$table&liststyle=$liststyle';
        </script>
    ";
?>