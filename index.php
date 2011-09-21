<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" dir="ltr" lang="en-US">

<head profile="http://gmpg.org/xfn/11">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

<title>jSquares - An image collage like the ted.com homepage</title>
	
	<script src="http://www.google.com/jsapi" type="text/javascript"></script>
	<script type="text/javascript">google.load("jquery","1.6.1");</script>
	
	<!-- styles -->
	<link rel="stylesheet" href="css/jsquares.css" type="text/css" media="all" />
	
	<!-- js -->
    <script src="js/jquery.hoverintent.min.js" type="text/javascript"></script>
	<script src="js/jquery.jsquares.js" type="text/javascript"></script>
	<script type="text/javascript">
		$(document).ready(function(){

			$('#js-container').jsquares();
			$('#js-container-2').jsquares({
				shuffle_in: false, // have the pictures all fade in on page load?
				fade_on_hover: false, // do we want the images to fade on hover or just change opacity?
				caption_slide_down: false // do we want the caption to slide down or just appear?
			});
			
		});
	</script>
	 
</head>

<body>
	
	<?
	// Just a template for drawing the boxes, feel free to mofidy to fit your needs
	$boxes = array(
		// sizes are styled through css and top, left css attributes are hard-coded on the div
		array('size' => 3, 'top' => 0, 'left' => 0),
		array('size' => 2, 'top' => 0,'left' => 224),
		array('size' => 2, 'top' => 78, 'left' => 224),
		array('size' => 3, 'top' => 0, 'left' => 336),
		array('size' => 2, 'top' => 0, 'left' => 560),
		array('size' => 2, 'top' => 78, 'left' => 560),
		array('size' => 2, 'top' => 156, 'left' => 0),
		array('size' => 3, 'top' => 156, 'left' => 112),
		array('size' => 2, 'top' => 156, 'left' => 336),
		array('size' => 1, 'top' => 156, 'left' => 448),
		array('size' => 1, 'top' => 195, 'left' => 448),
		array('size' => 2, 'top' => 156, 'left' => 504),
		array('size' => 1, 'top' => 156, 'left' => 616),
		array('size' => 1, 'top' => 234, 'left' => 56),
		array('size' => 1, 'top' => 234, 'left' => 336)
	);
	?>
	
		<h2>Example 1 (default)</h2>
		<pre>$('#js-container').jsquares();</pre>
	<div id="js-container">
	
		<?
		foreach($boxes as $box){
		?>
		
			<div class="js-image size-<?= $box['size']; ?>" style="top:<?= $box['top']; ?>px;left:<?= $box['left']; ?>px;">		
				<a href="#wolf!"><img class="js-small-image" src="images/wolf-moon.jpg"/></a>
				<div class="js-small-caption">
					<span>Howlla at cha boy!</span>
				</div>
				<div class="js-overlay-caption-content">
					<h4>You can't hide from wolf boy.</h4>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. In elementum arcu non orci fermentum nec suscipit neque dignissim... <a href="#">Read more &raquo;</a>
					</p>
				</div>
			</div>
		
		<? } ?>

	</div>
	
	
	
	<h2>Example 2</h2>
	<pre>
$('#js-container-2').jsquares({
	shuffle_in: false, // have the pictures all fade in on page load?
	fade_on_hover: false, // do we want the images to fade on hover or just change opacity?
	caption_slide_down: false // do we want the caption to slide down or just appear?
});</pre>
	<div id="js-container-2">
	
		<?
		foreach($boxes as $box){
		?>
		
			<div class="js-image size-<?= $box['size']; ?>" style="top:<?= $box['top']; ?>px;left:<?= $box['left']; ?>px;">		
				<img class="js-small-image" src="images/sesame-street.jpg"/>
				<div class="js-small-caption">
					<span>Everyone loves this show</span>
				</div>
				<div class="js-overlay-caption-content">
					<h4>Sesame Street!</h4>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. In elementum arcu non orci fermentum nec suscipit neque dignissim... <a href="#">Read more &raquo;</a>
					</p>
				</div>
			</div>
		
		<? } ?>

	</div>
	
	
	
</body>
</html>