<? 
	session_start(); 
	@extract($_POST);
	@extract($_GET);
	@extract($_SESSION);

	// $liststyle= $_GET['liststyle']; (get)
?>
<!DOCTYPE html>
<html lang="ko">

<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>고객지원 - 공지사항</title>
	<link rel="stylesheet" href="../common/css/common.css">
	<link rel="stylesheet" href="../sub6/common/css/sub6common.css">
	<link rel="stylesheet" href="./css/greet.css">
	<!-- <script src="../common/js/prefixfree.min.js"></script> -->

	<script src="../common/js/jquery-1.12.4.min.js"></script>
	<script src="../common/js/jquery-migrate-1.4.1.min.js"></script>

	<script>
		function del(href) {
			if (confirm("한번 삭제한 자료는 복구할 방법이 없습니다.\n\n정말 삭제하시겠습니까?")) {
				document.location.href = href;
			}
		}
	</script>
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
			<strong>메뉴</strong>
		</div>
		<div class="sub_nav">
			<ul>
				<li><a class="current" href="./list.php">공지사항</a></li>
				<!-- <li><a href="../sub6/sub6_1.html">공지사항</a></li> -->
				<li><a href="../sub6/sub6_2.html">이벤트</a></li>
				<li><a href="../sub6/sub6_3.html">FAQ</a></li>
				<li><a href="../sub6/sub6_4.html">고객의소리</a></li>
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
					<form name="board_form" method="post" action="insert.php?liststyle=<?=$liststyle?>">
						<ul class="bbs_write_top">
							<li>
								<dl>
									<dt>닉네임</dt>
									<dd>
										<?=$usernick?>
									</dd>
								</dl>
							</li>
							<li>
								<dl>
									<dt><label for="subject">제목</label></dt>
									<dd><input type="text" id="subject" name="subject" required></dd>
								</dl>
							</li>
							<li>
								<dl>
									<dt><label for="contents">내용</label></dt>
									<dd>
										<div class="check">
											<input type="checkbox" name="html_ok" id="html_ok" value="y">
											<label for="html_ok">HTML 쓰기</label>
										</div>
										<div>
											<textarea name="contents" id="contents" required></textarea>
										</div>
									</dd>
								</dl>
							</li>
						</ul>

						<div class="btn_wrap">
							<a href="list.php?page=<?=$page?>&liststyle=<?=$liststyle?>">목록</a>
							<button type="submit" class='active'>완료</button>
						</div>
					</form>
				</div>


			</div>
		</article>

		<? include "../common/sub_footer.html" ?>
	</div>

	<!-- 스크롤에 반응하는 header, familySite box JS -->
	<script src="../common/js/common.js"></script>
</body>

</html>