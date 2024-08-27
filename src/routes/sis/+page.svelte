<script>
    import { goto } from '$app/navigation'
	import { parseData } from '$lib/js/parseData.js'
	import { session } from '$lib/stores/session.js'
	import { oldAssignments } from '$lib/stores/oldAssignments.js'
	import Spinner from '$lib/components/Spinner.svelte'

    let loading = false

    async function infiniteCampus() {
        goto('/login/infiniteCampus')
    }

    function studentVue() {
        goto('login/studentVue')
    }
</script>

<svelte:head>
	<title>Select SIS</title>
</svelte:head>

<div class="content">
    <form>
        <h2>Select Your S.I.S.</h2>
        <button type=button on:click={infiniteCampus}>
            {#if loading}
                <Spinner width={20} border={2} />
            {:else}
                Infinite Campus
            {/if}
        </button>
        <button type=button on:click={studentVue}>
            {#if loading}
                <Spinner width={20} border={2} />
            {:else}
                StudentVue
            {/if}
        </button>
    </form>
</div>

<style lang="scss">
	.content {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	form {
		@include box;
		width: 500px;
		display: flex;
		flex-direction: column;
	}

	h2 {
		width: 100%;
		text-align: center;
	}

	button {
		display: flex;
		justify-content: center;
        margin-top: $spacing-small;
	}

	@media (max-width: $breakpoint-phone) {
		form {
			margin: auto $spacing;
		}
	}
</style>