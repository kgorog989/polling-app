import React, { useCallback, useEffect, useState } from 'react'
import { useSnackbar } from 'notistack'
import { deletePollById, getMyPolls } from '../../../services/poll/poll';

const ViewMyPolls = () => {
  const [polls, setPolls] = useState([])
  const [loading, setLoading] = useState(false);
  const {enqueueSnackbar} = useSnackbar();

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const response = await getMyPolls()
      if(response.status === 200){
        setPolls(response.data)
      }

    } catch (error) {
      enqueueSnackbar('An error occurred while fetching polls', {variant: 'error', autoHideDuration: 5000})
    } finally {
      setLoading(false)
    }
  }, [enqueueSnackbar])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleDeletePoll = async (pollId) => {
    setLoading(true)
    try {
      await deletePollById(pollId)
      if(response.status === 201){
        enqueueSnackbar('Poll deleted successfully', {variant: 'success', autoHideDuration: 5000})
        fetchData() // Refreshing the list after deletion
      }

    } catch (error) {
      enqueueSnackbar('An error occurred while deleting poll!', {variant: 'error', autoHideDuration: 5000})
    } finally {
      setLoading(false)
    }
  }

  return (
    <h1>Viewmypoll Works!</h1>
  )
}

export default ViewMyPolls