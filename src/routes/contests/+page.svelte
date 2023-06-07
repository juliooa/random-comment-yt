<script lang="ts">
	import type { PageData } from './$types';
	import type { Comment } from '$lib/youtube_client';
	import { confetti } from '@neoconfetti/svelte';
	export let data: PageData;

	function getRandomComment() {
		return data.comments[Math.floor(Math.random() * data.comments.length)];
	}

	function shuffleComments() {
		var shuffling = setInterval(() => {
			selectedComment = getRandomComment();
		}, 300);
		setTimeout(function () {
			clearInterval(shuffling);
			isFinished = true;
		}, 5000);
	}

	let selectedComment: Comment;
	let isFinished = false;
</script>

<div class="container">
	<div class="card thumbnail">
		<div class="title">{data.video.title}</div>
		<iframe
			width="560"
			height="315"
			src="https://www.youtube.com/embed/c1vuyTndhv8"
			title="YouTube video player"
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowfullscreen
		/>
	</div>
	{#if selectedComment != undefined}
		{#if isFinished}
			<div use:confetti />
		{/if}
		<div class="card comments">
			<div>
				<img class="avatar_img" src={selectedComment.authorProfileImageUrl} alt="avatar user" />
			</div>
			<div>
				<div class="name">{selectedComment?.authorName}</div>
				<div class="text">{selectedComment?.text}</div>
			</div>
		</div>
	{/if}
	<div class="button_container">
		<button class="btn btn-primary" on:click={shuffleComments}>Comenzar</button>
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.thumbnail {
		font-size: 2.325rem;
		width: 50%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.avatar_img {
		border-radius: 50%;
		width: 70px;
		margin: 5px;
	}

	.card .title {
		font-size: 2.125rem;
		font-weight: 700;
		color: #566a7f;
		margin-bottom: 5px;
	}

	.card.thumbnail {
		padding: 20px;
		width: 50%;
	}
	.card.comments {
		padding: 20px;
		margin-top: 20px;
		color: #566a7f;
		width: 40%;
		display: flex;
	}
	.card.comments .name {
		font-size: 1.325rem;
		font-weight: 500;
	}
	.card.comments .text {
		font-size: 1.325rem;
	}
	.card {
		position: relative;
		min-width: 0;
		word-wrap: break-word;
		background-color: #fff;
		background-clip: border-box;
		border: 0 solid #d9dee3;
		border-radius: 0.5rem;
		background-clip: padding-box;
		box-shadow: 0 2px 6px 0 rgba(67, 89, 113, 0.12);
	}
	.btn {
		margin-top: 20px;
		font-weight: 400;
		line-height: 1.53;
		color: #697a8d;
		text-align: center;
		vertical-align: middle;
		cursor: pointer;
		user-select: none;
		background-color: transparent;
		border: 1px solid transparent;
		padding: 0.4375rem 1.25rem;
		font-size: 2.9375rem;
		border-radius: 0.375rem;
		transition: all 0.2s ease-in-out;
	}

	.btn:hover {
		color: #697a8d;
	}
	.btn-primary {
		color: #fff;
		background-color: #696cff;
		border-color: #696cff;
		box-shadow: 0 0.125rem 0.25rem 0 rgba(105, 108, 255, 0.4);
	}
	.btn-primary:hover {
		color: #fff;
		background-color: #5f61e6;
		border-color: #5f61e6;
		transform: translateY(-1px);
	}
	.btn-primary:disabled {
		border: 1px solid #999999;
		background-color: #cccccc;
		color: #666666;
		box-shadow: 0 0.125rem 0.25rem 0 rgba(141, 141, 141, 0.4);
	}
</style>
