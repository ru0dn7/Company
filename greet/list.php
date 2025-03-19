<? 
	session_start(); 
	@extract($_POST);
	@extract($_GET);
	@extract($_SESSION);
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
	<script src="../common/js/jquery.easing.1.3.js"></script>

	<!-- 구글아이콘 폰트 -->
	<link
		href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
		rel="stylesheet">


</head>
<body>
<?
	include "../lib/dbconn.php";

	if (!$scale){  // 넘어오는 $scale 파라미터 값이 없으면
		$scale = 5;	// 한 화면에 표시되는 글 수
	}

	if ($mode=="search")	// 검색 버튼을 통한 리스트 출력
	{
		if(!$search)	// input입력값 없이 검색버튼 클릭 시 (required로 대체)
		{
			echo("
				<script>
				window.alert('검색할 단어를 입력해 주세요!');
				history.go(-1);
				</script>
			");
			exit;
		}

		$sql = "select * from greet where $find like '%$search%' order by num desc";	// 검색내용 표시, 내림차순
	}
	else	// 일반 리스트 출력(페이지번호)
	{
		$sql = "select * from greet order by num desc";
	}


	$result = mysqli_query( $connect, $sql);
	$total_record = mysqli_num_rows($result); // 전체 글 수

	// 전체 페이지 수($total_page) 계산 
	if ($total_record % $scale == 0)
	{
		$total_page = floor($total_record/$scale);
	}
	else
	{
		$total_page = floor($total_record/$scale) + 1;
	}
	
	if (!$page){                 // 페이지번호($page)가 0 일 때
		$page = 1;	// 페이지 번호를 1로 초기화
	}
 
	// 표시할 페이지($page)에 따라 $start 계산
	$start = ($page - 1) * $scale;
	$number = $total_record - $start;
?>


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
				<div class="bbs_wrap">

					<div class="bbs_sort">
						<div class="total">총 <b>
								<?= $total_record ?>
							</b> 개의 게시물이 있습니다.</div>

						<select class="scale" name="scale"
							onchange="location.href='list.php?scale='+this.value+'&liststyle=<?=$liststyle?>'">
							<option value=''>
								<?=$scale?>개씩
							</option>
							<option value='5'>5개씩</option>
							<option value='8'>8개씩</option>
							<option value='10'>10개씩</option>
							<option value='15'>15개씩</option>
						</select>

						<ul class="lst_style">
							<li class="active"><a href="list.php?liststyle=list&scale=<?=$scale?>">목록형</a></li>
							<li><a href="list.php?liststyle=box&scale=<?=$scale?>">박스형</a></li>
						</ul>

					</div>


					<div class="bbs_lst">
						<ul class="lst_ttl">
							<li class="lst_width1">번호</li>
							<li class="lst_width2">제목</li>
							<li class="lst_width3">글쓴이</li>
							<li class="lst_width4">등록일</li>
							<li class="lst_width5">조회</li>
						</ul>
						<ul class="lst_cont">
							<?		
								for ($i=$start; $i<$start+$scale && $i < $total_record; $i++)
								{
									mysqli_data_seek($result, $i);
									// 가져올 레코드로 위치(포인터) 이동
									$row = mysqli_fetch_array($result);
									// 하나의 레코드 가져오기
						
									$item_num     = $row[num];	// 실제 해당 레코드의 num필드에 있는 게시번호, 프라이머리 키
									$item_id      = $row[id];
									$item_name    = $row[name];
									$item_nick    = $row[nick];
									$item_hit     = $row[hit];
									
									$item_date    = $row[regist_day];	// 2022-02-21 (11:10)
									$item_date = substr($item_date, 0, 10);	// 2022-02-21
									
									$item_subject     = $row[subject];
									$item_content     = $row[content];
						
									// $item_subject = str_replace(" ", "&nbsp;", $row[subject]);
									// $item_content = str_replace(" ", "&nbsp;", $row[content]);
									// srt_replace 문자를 교체함. " "공백문자가 들어있으면 &nbsp; 로 변경해서 찍는다.
						
							?>
							<li>
								<div class="lst_width1">
									<?= $number ?>
								</div>
								<div class="lst_width2">
									<a href="view.php?num=<?=$item_num?>&page=<?=$page?>&liststyle=<?=$liststyle?>">
										<p>
											<?= $item_subject ?>
										</p>
										<div class="content">
											<?= $item_content ?>
										</div>
									</a>
								</div>
								<div class="lst_width3">
									<?= $item_nick ?>
								</div>
								<div class="lst_width4">
									<?= $item_date ?>
								</div>
								<div class="lst_width5">
									<?= $item_hit ?>
								</div>
							</li>
							<?
									$number--;
								}
							?>
						</ul>
					</div>

					<div class="page_num">
						<span class="prev">이전</span>
						<?
							// 게시판 목록 하단에 페이지 링크 번호 출력
							for ($i=1; $i<=$total_page; $i++)
							{
								if ($page == $i)     // 현재 페이지 번호 링크 안함
								{
									echo "<span class='active'>{$i}</span>";
								}
								else
								{
									if($mode=="search")	// 검색리스트일 때 (page, scale, mode, find, search)
									{
										echo "<span><a href='list.php?page=$i&scale=$scale&liststyle=$liststyle&mode=search&find=$find&search=$search'>{$i}</a></span>";
									}
									else
									{    // 일반 리스트일 때
										echo "<span><a href='list.php?page=$i&scale=$scale&liststyle=$liststyle'>{$i}</a></span>";
									}
								}
							}
						?>
						<span class="next">다음</span>
					</div>

					<div class="btn_wrap">
						<a href="list.php?page=<?=$page?>&liststyle=<?=$liststyle?>">목록</a>
						<? if($userid){	// 로그인 했을 경우 ?>
						<a href="write_form.php?liststyle=<?=$liststyle?>" class='active'>글쓰기</a>
						<? } ?>
					</div>


					<div class="bbs_search">
						<form name="board_form" method="post" action="list.php?mode=search&liststyle=<?=$liststyle?>">
							<select name="find">
								<option value='subject'>제목</option>
								<option value='content'>내용</option>
								<option value='nick'>별명</option>
								<option value='name'>이름</option>
							</select>
							<label class="hidden" for="search"></label>
							<input type="text" name="search" id="search" required placeholder="검색어를 입력하세요">
							<button type="submit">검색</button>
						</form>
					</div>
				</div>
			</div>
		</article>

		<?
			if (!$liststyle){ // $liststyle 파라미터가 넘어오지 않았으면
				$liststyle = 'list';	// 리스트 스타일 (기본)
				echo "
					<script>
						$('.lst_style li').removeClass('active');
						$('.lst_style li:eq(0)').addClass('active');
					</script>
				";
			} else if($liststyle == 'box'){
				$liststyle = 'box';	// 리스트 스타일 (박스형)
				echo "
					<script>
						$('.lst_style li').removeClass('active');
						$('.lst_style li:eq(1)').addClass('active');
						$('.bbs_lst').addClass('box');
					</script>
				";

			}
		?>

		<? include "../common/sub_footer.html" ?>
	</div>

	<!-- 폰트어썸 -->
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.0/css/all.min.css"
		integrity="sha512-9xKTRVabjVeZmc+GUW8GgSmcREDunMM+Dt/GrzchfN8tkwHizc5RP4Ok/MXFFy5rIjJjzhndFScTceq5e6GvVQ=="
		crossorigin="anonymous" referrerpolicy="no-referrer">

	

	<!-- 스크롤에 반응하는 header, familySite box JS -->
	<script src="../common/js/common.js"></script>

</body>

</html>