<template>
<div class="flex flex-col">
    <div class="-my-2 overflow-x-auto ">
        <div class="pb-2 pt-4 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div class="shadow overflow-hidden border border-gray-500 sm:rounded-lg bg-gray-50 ">
                <table class="min-w-full divide-y divide-gray-400">
                    <thead class="bg-gray-50">
                        <tr>
                            <th v-for="headItem in tableHead" :key="headItem" scope="col" class=" px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {{ headItem }}
                            </th>
                            <th v-if="editItem" scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Izmeni
                            </th>
                            <th v-if="deleteItem" scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Obriši
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-300">
                        <tr v-for="row in tableData" :key="row.id" :class="rowClass" @click="$emit('row', row)" >
                            <td v-for="(item, index) in tableDataFields" @click="$emit('clickNative', row)" :key="index"  class="px-6 py-4 whitespace-nowrap" >
                                <div class="text-sm font-medium text-gray-900 " :class="item.class">
									<span v-if="item.iconClass" @click="$emit('col-'+index, row)" >
										<i :class="item.iconClass"></i>
									</span>
                                    {{ item.parser ? item.parser(row[item.value]) : row[item.value]}}
                                </div>
                            </td>
							<td v-if="slotProp" class="px-6 py-4 whitespace-nowrap ">
                                <div @click="$emit('clickSlot', row)" class="flex items-center text-gray-900">
									<slot />
                                </div>
                            </td>
                            <td v-if="editItem" @click="$emit('edit', row)" class="px-6 py-4 whitespace-nowrap ">
                                <div  class="flex justify-center items-center text-gray-900">
                                    <i class="fas fa-edit text-green-600 cursor-pointer transition duration-500 ease-in-out hover:text-green-800 transform hover:scale-125"></i>
                                </div>
                            </td>
                            <td v-if="deleteItem" @click="$emit('delete', row)" class="px-6 py-4 whitespace-nowrap">
                                <div  class="flex justify-center items-center text-gray-900">
                                    <i class="fas fa-trash-alt text-red-600 cursor-pointer transition duration-500 ease-in-out hover:text-red-800 transform hover:scale-125"></i>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
</template>

<script lang="ts">
import {
    Component, Prop ,
    Vue
} from 'vue-property-decorator'
@Component({
})
export default class Table extends Vue {
	@Prop({required: true}) readonly tableHead! : [];
	@Prop({required: true}) readonly tableData! : [];
	@Prop({required: true}) readonly tableDataFields! : [];
	@Prop({required: false , default: false}) readonly slotProp! : boolean;
	@Prop({required: false , default: true}) readonly deleteItem! : boolean;
	@Prop({required: false , default: true}) readonly editItem! : boolean;
	@Prop({required: false}) readonly rowClass! : string;
}
</script>

<style scoped>
/* width */
::-webkit-scrollbar {
    height: 10px;
}

/* Track */
::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 5px;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: grey;
    border-radius: 5px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: darkgray;
}
</style>
