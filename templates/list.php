<script type="text/html" id="templatePostList">
    <article class="row list-block ">
        <div class="label-container">
            <span class="label">List View</span>
        </div>
        <div class="span8 block-wrap fluid-offset-none">
            <div class="block-image">
                <img src="<%= thumbnail.thumbnail.url %>" width="<%= thumbnail.thumbnail.width %>" height="<%= thumbnail.thumbnail.height %>">
            </div>
            <div class="block-content">
                <div class="block-tax">
                    Category
                </div>
                <div class="block-title">
                    <h3>
                        <a href="<%= permalink %>">
                            <%= title %>
                        </a>
                    </h3>
                </div>
            </div>
        </div>
    </article>
    <hr>
</script>