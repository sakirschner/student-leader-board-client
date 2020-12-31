<template>
    <v-container>
        <v-card>
            <div v-for="group in groups.groups" :key="group.id">
            {{group.points}}
            </div>
        </v-card>
    </v-container>
</template>

<script>
export default {
    props: {
        groups: Object
    },
    updated() {
        this.$forceUpdate();
    }
}
</script>

<style>

</style>