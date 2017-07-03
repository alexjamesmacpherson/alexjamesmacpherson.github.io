<!DOCTYPE html>
<?php
	mysql_connect(localhost,"spanj","toeJam475");
	@mysql_select_db("sjbcj") or die( "Unable to select database");
?>
<html>
	<head>
		<title>Testimonials - SJB Carpentry & Joinery - Churchdown, Gloucester</title>
		<meta http-equiv="content-type" content="text/html; charset=utf-8" >
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta name="description" content="Don't just take our word for it, read what our customers have to say about out affordable, professional and friendly service. For a free quote, get in touch.">
		
		<link href='https://fonts.googleapis.com/css?family=Cinzel|Quattrocento|Open+Sans' rel='stylesheet' type='text/css'>
		<link rel="stylesheet" href="/css/reset.css">
		<link rel="stylesheet" href="/css/style-alt.css">
		
		<script src="/js/jquery-1.11.2.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="/js/script-alt.js" type="text/javascript" charset="utf-8"></script>
		<script src="https://use.fontawesome.com/ce64561b3b.js"></script>
		
		<link rel="icon" href="/logo.ico" type="image/ico">
		<link rel="shortcut icon" href="/logo.ico" type="image/ico">
	</head>

	<body>
		<a name="top"></a>
		<nav>
			<div class="nav nav-back">
				<div class="text">
					<div class="nav-logo">
						<a href="#top">
							<svg class="nav-svg" height="50" width="50" x="0px" y="0px" viewBox="0 0 800 800">
								<style type="text/css">
									.st3{fill:#48B75A;}
									.st4{fill:#EEEEEE;}
									.nav-svg:hover .st4 {fill:#9DC4F6;}
								</style>
								<path class="st3" d="M180.2,326.4c126.4,109,280.5,155.6,443.5,181.9C564.3,590.3,491,638.1,411,669.7c61.4-39.8,120.1-81.7,157.3-140.7c-178.2-15.8-296.2-61.9-394.3-118C174.3,381.2,176.3,353.1,180.2,326.4z"/>
								<path class="st4 smooth-text" d="M269,100c34.6,170.5,152.7,261,287,336c-65.7,142.6-153,208.3-243,264c77-71,145-146.9,175-243c-154-63.4-243-136.7-286.5-222.5C218.1,184.4,240.9,139.8,269,100z"/>
								<path class="st4 smooth-text" d="M185,542c-3.3-20.3-6-42-8.2-65c77.9,37.8,169.3,56.1,278.2,60l-14,23C380.1,566,294.1,559.6,185,542z"/>
							</svg>
						</a>
					</div>
					<div class="nav-fb smooth-text"><a class="smooth-text" href="https://www.facebook.com/SJBCarpentry/" target="_blank"><i class="fa fa-facebook-official fa-lg" aria-hidden="true"></i></a></div>
					<div class="nav-item smooth-text"><a class="smooth-text" href="/#contact">Contact Us</a></div>
					<div class="nav-item smooth-text"><a class="smooth-text" href="/#work">Our Work</a></div>
					<div class="nav-item smooth-text"><a class="smooth-text" href="/#about">About Us</a></div>
					<div class="nav-item smooth-text"><a class="smooth-text" href="/">Home</a></div>
				</div>
			</div>
		</nav>
		<div class="section header">
			<div class="title">
				<div class="title-name">STUART JAMES BOOTH</div>
				<div class="title-carpentry">Carpentry</div>
				<div class="title-middle">
					<div class="title-line"></div>
					<div class="title-amp"> & </div>
					<div class="title-line"></div>
				</div>
				<div class="title-joinery">Joinery</div>
				<div class="title-alt">TESTIMONIALS</div>
			</div>
		</div>
		<div class="section testimonials">
			<div class="text">
				<div class="section-title smooth droppable-title">
					Testimonials
					<div class="section-line smooth droppable-title"></div>
				</div>
				<div class="description highlight smooth invisible">
					Don't just take our word for it, here's what our customers have to say about us.
				</div>
				<a href="/">
					<div class="return-button button-top smooth invisible">Go back</div>
				</a>
				
				<?php
					$query = "SELECT * FROM testimonials";
					$result = mysql_query($query);
					$num = mysql_numrows($result);
					$html = "";
					
					for($i = 0; $i < $num; $i++) {
						$odd = ($i % 2 == 0) ? "" : " odd";
						$html .= "<div class='item smooth" . $odd . " droppable'>
									<div class='i-img' style='background: url(\"\/img\/rando-" . (((int)$i % 3) + 1) . ".jpg\") no-repeat center center; background-size: cover;'></div>
									<div class='i-title serif'>" . mysql_result($result,$i,"name") . "</div>
									<div class='i-text'>" . mysql_result($result,$i,"message") . "</div>
									<div class='i-date serif'>- ". date("F, Y", strtotime(mysql_result($result,$i,"date"))) . "</div>
								</div>";
					}
					
					mysql_close();
					echo $html;
				?>
				
				<a href="/">
					<div class="smooth droppable-title">
						<div class="return-button smooth-text">Go back</div>
					</div>
				</a>
			</div>
		</div>
		<div class="section footer">
			<div class="foot-text smooth invisible">SJB Carpentry & Joinery are fully insured</div>
			<div class="text">
				<a href="#top">
					<div class="foot-logo smooth invisible">
						<svg class="foot-svg1" height="50" width="50" x="0px" y="0px" viewBox="0 0 800 800">
							<style type="text/css">
								.st0{fill:#48B75A;}
								.st1{fill:#2A82F2;}
								.foot-svg1:hover .st1 {fill:#9DC4F6;}
							</style>
							<path class="st0" d="M180.2,326.4c126.4,109,280.5,155.6,443.5,181.9C564.3,590.3,491,638.1,411,669.7c61.4-39.8,120.1-81.7,157.3-140.7c-178.2-15.8-296.2-61.9-394.3-118C174.3,381.2,176.3,353.1,180.2,326.4z"/>
							<path class="st1 smooth-text" d="M269,100c34.6,170.5,152.7,261,287,336c-65.7,142.6-153,208.3-243,264c77-71,145-146.9,175-243c-154-63.4-243-136.7-286.5-222.5C218.1,184.4,240.9,139.8,269,100z"/>
							<path class="st1 smooth-text" d="M185,542c-3.3-20.3-6-42-8.2-65c77.9,37.8,169.3,56.1,278.2,60l-14,23C380.1,566,294.1,559.6,185,542z"/>
						</svg>
					</div>
				</a>
				<a href="http://www.alexmacpherson.uk/">
					<div class="foot-am smooth invisible">
						<svg class="foot-svg2" height="60" width="60" x="0px" y="0px" viewBox="0 0 800 600">
							<style type="text/css">
								.st2{fill:rgb(255,130,138);}
								.foot-svg2:hover .st2 {fill:rgb(248,154,103);}
							</style>
							<path class="st2 smooth-text" d="M475,499.5l-99.6-199.2l-50.2,99.6L275,299.5l100-200l200,400H475z M325,499.5l-200-400L75.4,200.3l49.6,99.3H25L75.3,400l100.1,0.2l49.6,99.3H325z"/>
						</svg>
					</div>
				</a>
			</div>
		</div>
	</body>
</html>
