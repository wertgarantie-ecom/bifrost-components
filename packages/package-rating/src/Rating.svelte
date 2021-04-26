<svelte:options tag="wertgarantie-rating"/>

<script lang="ts">
	import { onMount } from "svelte";
	import fetchBifrost from "wertgarantie-common/src/fetchBifrost";

    
    export let bifrosturi: string;
    export let link: string = "https://www.wertgarantie.de/#/";
    export let linktext: string = "";
    export let rating: number | null = null;
    export let ratingstotal: number | null = null;
    export let showratingnumber: boolean = false;

	const starText = '★★★★★';

    onMount(async () => {
		await fetchBifrost(`${bifrosturi}/ecommerce/rating`, 'GET')
			.then((result: any) => setProperties(result))
      		.catch((e: Error) => { throw e });
	});

	const setProperties = (ratingResponse: any) => {
		if(ratingResponse.body.error_message) throw Error(ratingResponse.body.error_message);

		if (ratingResponse.rating && ratingResponse.text && ratingResponse.ratingsTotal && ratingResponse.uri) {
			rating = Math.round(ratingResponse.rating * 10) / 10;
			link = ratingResponse.uri;
			linktext = ratingResponse.text;
			ratingstotal = ratingResponse.ratingsTotal;
		}
	}

</script>

{#if rating && ratingstotal && linktext}

	<div class="rating">
		{#if showratingnumber}
			<span class="rating__number" id="rating">{rating}</span>
		{/if}

		<div class="rating__stars" id="wertgarantie-rating-stars" style="--rating: {rating}">{starText}</div>
		<a target="_blank" rel="noopener noreferrer" class="rating__link" href={link}>{ratingstotal} {linktext}</a>

	</div>
	
{/if}


<style>
    :host {
        display: inline-block;
    }

    .rating {
        font-family: var(--wertgarantie-rating-font-family, Roboto), sans-serif;
        font-size: var(--wertgarantie-rating-font-size, 16px);
    }

    .rating__number {
        color: var(--wertgarantie-rating-text-color, #2574be);
        font-weight: var(--wertgarantie-rating-font-weight, 400);
    }

    .rating__stars {
        --rating: 1.3;
        --star-empty: #d3dbdb;
        --star-filled: var(--wertgarantie-rating-stars-color, #ee8a18);
        --percent: calc(var(--rating) / 5 * 100%);
        display: inline-block;
        font-family: Arial, serif; /* make sure ★ appears correctly */
        background: linear-gradient(
            90deg,
            var(--star-filled) var(--percent),
            var(--star-empty) var(--percent)
        );
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        letter-spacing: 3px;
        font-size: var(--wertgarantie-rating-stars-font-size, inherit);
    }

    .rating__link {
        color: var(--wertgarantie-rating-text-color, #2574be);
        text-decoration: none;
        font-weight: var(--wertgarantie-rating-font-weight, 400);
    }
</style>
