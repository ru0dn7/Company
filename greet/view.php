<? 
	session_start(); 
	@extract($_POST);
	@extract($_GET);
	@extract($_SESSION);


	
    //세션변수
	// $num=11 (프라이머리 값)
	// $page=1
	// $liststyle=list

	include "../lib/dbconn.php"; //db접속

	$sql = "select * from greet where num=$num"; // 프라이머리 값을 검색
	$result = mysqli_query( $connect, $sql);

    $row = mysqli_fetch_array($result);      
      // 하나의 레코드 가져오기
	
	$item_num     = $row[num];
	$item_id      = $row[id];
	$item_name    = $row[name];
  	$item_nick    = $row[nick];
	$item_hit     = $row[hit];

    $item_date    = $row[regist_day];

	$item_subject = str_replace(" ", "&nbsp;", $row[subject]); 	// 공백문자 대체

	$item_content = $row[content];
	$is_html      = $row[is_html];

	if ($is_html!="y")
	{
		$item_content = str_replace(" ", "&nbsp;", $item_content);	// 공백문자 대체
		$item_content = str_replace("\n", "<br>", $item_content);	// 내려쓰기 대체
	}

	$new_hit = $item_hit + 1;

	$sql = "update greet set hit=$new_hit where num=$num";   // update로 글 조회수 증가시킴
	mysqli_query( $connect, $sql);
?>
<!DOCTYPE html>
<html lang="ko">

<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>커뮤니티:공지사항</title>
	<link rel="stylesheet" href="../common/css/common.css">
	<link rel="stylesheet" href="../sub6/common/css/sub6common.css">
	<link rel="stylesheet" href="./css/greet.css">

	<script src="../common/js/jquery-1.12.4.min.js"></script>
	<script src="../common/js/jquery-migrate-1.4.1.min.js"></script>


</head>

<body>
	<div class="skipNav">
		<a href="#content">본문 바로가기</a>
		<a href="#gnb">글로벌 네비게이션 바로가기</a>
	</div>
	<? include '../common/sub_header.html' ?>
	<div class="wrap">
		<div class="visual">
			<img src="" alt="">
			<strong>커뮤니티</strong>
		</div>
		<div class="sub_nav">
			<ul>
				<li><a class="current" href="./list.php">공지사항</a></li>
				<!-- <li><a href="../sub6/sub6_1.html">공지사항</a></li> -->
				<li><a href="../sub6/sub6_2.html">이벤트</a></li>
				<li><a href="../sub6/sub6_3.html">FAQ</a></li>
				<li><a href="../sub6/sub6_4.html">고객의소리</a></li>
				<li><a href="../news/list.php">NEWS</a></li>
			</ul>
		</div>
		<article id="content">
			<div class="title_area">
			<div class="line_map">
                    <a href="../index.html"><span class="material-symbols-outlined">home</span>Home ></a> 커뮤니티 >
                    <strong>공지사항</strong>
                </div>
                <div class="title_wrap">
                    <span>Notice</span>
                    <h2>공지사항</h2>
                </div>
			</div>
			<div class="content_area">
				<!-- <div class="summary">
				  <p>포스코엠텍 공지사항을 알려드립니다.</p>
				  <p>철강포장 및 소재 전문기업으로서 철강사업에 새로운 가치를 제공하고 시너지를 창출하고자 합니다.</p>
			  </div> -->
				<div class="bbs_wrap">

					<ul class="bbs_view_ttl">
						<li>
							<?= $item_subject ?>
						</li>
						<li>
							<span>
								<?= $item_nick ?>
							</span>
							<span>
								<?= $item_date ?>
							</span>
							<span><i class="fa-regular fa-eye"><i>조회수</i></i>
								<?= $item_hit ?>
							</span>
						</li>
					</ul>


					<div class="bbs_view_cont">
						<?= $item_content ?>
					</div>

					<div class="btn_wrap">
						<a href="list.php?page=<?=$page?>&liststyle=<?=$liststyle?>">목록</a>
						<? 
							if($userid==$item_id || $userlevel==1 || $userid=="admin")
							// 로그인된 아이디 == 글쓴이 이거나 최고 관리자(admin, 레벨 1)면 참
							{
						?>
						<a href="modify_form.php?num=<?=$num?>&page=<?=$page?>&liststyle=<?=$liststyle?>">수정</a>
						<a href="javascript:del('delete.php?num=<?=$num?>&liststyle=<?=$liststyle?>')">삭제</a>
						<?
							}
						?>
						<? 
							if($userid)  //로그인이 되면 글쓰기
							{
						?>
						<a href="write_form.php?page=<?=$page?>&liststyle=<?=$liststyle?>" class='active'>글쓰기</a>
						<?
							}
						?>
					</div>
				</div>
			</div>
		</article>

		<? include "../common/sub_footer.html" ?>
	</div>
	
	<script src="https://kit.fontawesome.com/cdd59ed73b.js" crossorigin="anonymous"></script>
	<!-- <script src="../common/js/prefixfree.min.js"></script> -->
	<script>
		function del(href) {
			if (confirm("한번 삭제한 자료는 복구할 방법이 없습니다.\n\n정말 삭제하시겠습니까?")) {
				document.location.href = href;
			}
		}
	</script>
		
	<!-- 스크롤에 반응하는 header, familySite box JS -->
	<script src="../common/js/common.js"></script>
</body>

</html>