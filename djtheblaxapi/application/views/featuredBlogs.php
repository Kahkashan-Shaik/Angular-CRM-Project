<div class="container">
	
	<div class="row">
		<div class="col-12">
			<div class="card">
				<div class="card-header">
					<h1 class="text-center">FEATURED BLOGS  API USING CODEIGNITER</h1>
				</div>
				<div class="card-body">
					<div class="row">
					<?php
					foreach($featuredBlogs as $key => $value ){
					?>
					<div class="col-4 mb-5">
						<div class="card">
						<div class="card-body">
							<div class="row">
								<div class="col-12">
									<img src="<?=$value['image']?>" class="img-fluid">
								</div>
								<div class="col-12 mt-2">
									<h6><?=$value['title']?></h6>
								</div>
								<div class="col-12 mt-2">
									<p><?=$value['short_desc']?></p>
								</div>
								<div class="col-4 mt-2">
									<p class="text-left"><?=$value['author']?></p>
								</div>
								<div class="col-8 mt-2">
									<p class="text-right"><?=$value['created_at']?></p>
								</div>
							</div>
						</div>
					</div>
					</div>
					
					<?php

					}
					?>
					</div>
				</div>
				<div class="card-footer text-center">
					Happy Learning
				</div>
			</div>
		</div>
	</div>

</div>
