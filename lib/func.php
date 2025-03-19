<?
	function latest_article($table, $loop, $char_limit, $char_limit_con)	// 테이블명, 노출갯수, 글자수
	{
		include "dbconn.php";

		$sql = "select * from $table order by num desc limit $loop";
		$result =  mysqli_query( $connect, $sql);

		while ($row = mysqli_fetch_array($result))
		{
			$num = $row[num];
			$len_subject = mb_strlen($row[subject], 'utf-8');	// 한글도 1자로 처리, 제목의 총 글자 수
			$subject = $row[subject];
			$len_content = mb_strlen($row[content], 'utf-8');
			$content = $row[content];

			if ($len_subject > $char_limit)	// 제한글자수보다 크면
			{
				// $subject = str_replace( "&#039;", "'", $subject);
				$subject = mb_substr($subject, 0, $char_limit, 'utf-8');
				$subject = $subject."...";
			}

			if ($len_content > $char_limit_con)	// 제한글자수보다 크면
			{
				// $subject = str_replace( "&#039;", "'", $subject);
				$content = mb_substr($content, 0, $char_limit_con, 'utf-8');
				$content = $content."...";
			}
			
			$regist_day = substr($row[regist_day], 0, 10);	// '2022-02-21'

            
			
			// if($table=='greet'){		// 공지사항 table

			// 	echo "      
			// 		<li>
			// 			<a href='./$table/view.php?table=$table&num=$num'>
			// 				$subject <span>$regist_day</span>
			// 			</a>
			// 		</li>
			// 	";    
			// }


			
			// if($table=='concert'){		// 콘서트 table

			// 	if($row[file_copied_0]){	//	첨부된 이미지가 있으면
			// 		$concertimg='./concert/data/'.$row[file_copied_0];
			// 	}else{
			// 		$concertimg= './concert/data/default.gif';
			// 	}

			// 	echo "      
			// 		<li>
			// 			<a href='./$table/view.php?table=$table&num=$num'>
			// 			    <img src='$concertimg'>
			// 				<dl>
			// 					<dt>$subject</dt>
			// 					<dd>
			// 						$content
			// 						<span>$regist_day</span>
			// 					</dd>
			// 				</dl>
			// 			</a>
			// 		</li>
			// 	";    
			// }

			

			if($table=='greet'){		// 공지사항 table

				echo "      
				<li>
					<a href='./$table/view.php?table=$table&num=$num'>
						<dl>
							<dt>$subject</dt>
							<dd>
							   $content
								<span>$regist_day</span>
							</dd>
						</dl>
					</a>
				</li>
				";    
			}
			
		}
		mysqli_close($connect); 
	}
?>