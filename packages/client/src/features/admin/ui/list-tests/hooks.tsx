import { useCreateTestMutation, useGetTestsQuery } from '@/entities/tests'

interface IListTests {
	state: {
		handleOpenModalTest: (id: string) => void
		valueSelected: string
	}
}

export const useListTest = ({ state }: IListTests) => {
	const { data, isSuccess, isLoading, isFetching } = useGetTestsQuery()
	const [createTest, { isLoading: isLoadingCreateTest }] = useCreateTestMutation()
	const { valueSelected: isSelected, handleOpenModalTest } = state

	const handleOpenModal = (id: string) => {
		handleOpenModalTest(id)
	}
	const handleCreateTest = () => {
		createTest({
			questionsIds: [],
			title: 'Новый тест',
		})
	}

	return {
		data,
		isSuccess,
		isLoading,
		handleOpenModal,
		handleCreateTest,
		isSelected,
		isFetching,
		isLoadingCreateTest,
	}
}
