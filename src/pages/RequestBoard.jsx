import React, { useState, useEffect } from 'react';
import { MessageSquare, Upload, ThumbsUp, CheckCircle, Clock } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function RequestBoard({ onUploadClick }) {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const { data, error } = await supabase
                .from('requests')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setRequests(data || []);
        } catch (error) {
            console.error('Error fetching requests:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpvote = async (id, currentUpvotes) => {
        setRequests(requests.map(req =>
            req.id === id ? { ...req, upvotes: currentUpvotes + 1 } : req
        ));

        try {
            const { error } = await supabase
                .from('requests')
                .update({ upvotes: currentUpvotes + 1 })
                .eq('id', id);

            if (error) throw error;
        } catch (error) {
            console.error('Error upvoting:', error);
        }
    };

    const handlePostRequest = async () => {
        const subject = prompt("Enter Subject (e.g. History):");
        if (!subject) return;
        const grade = prompt("Enter Grade (e.g. Grade 11):");
        if (!grade) return;
        const note = prompt("What do you need? (e.g. Unit 5 notes):");
        if (!note) return;
        const name = prompt("Your Name:");

        if (subject && grade && note && name) {
            try {
                const { data, error } = await supabase
                    .from('requests')
                    .insert([{
                        student_name: name,
                        subject,
                        grade,
                        note_content: note
                    }])
                    .select();

                if (error) throw error;
                if (data) setRequests([data[0], ...requests]);
            } catch (error) {
                console.error('Error posting request:', error);
                alert('Failed to post request. Please try again.');
            }
        }
    };

    return (
        <div className="container py-16">
            <div className="flex justify-between items-end mb-10">
                <div>
                    <h2 className="text-3xl mb-2">Community Requests</h2>
                    <p className="text-gray-500">
                        Can't find what you need? Post a request and let the community help you out.
                    </p>
                </div>
                <button onClick={handlePostRequest} className="btn-primary">
                    <MessageSquare size={20} />
                    Post a Request
                </button>
            </div>

            {loading ? (
                <div className="text-center py-16">
                    <p className="text-gray-500">Loading community requests...</p>
                </div>
            ) : requests.length === 0 ? (
                <div className="text-center py-16 upload-area">
                    <p className="text-gray-500 text-lg">No requests yet. Be the first to ask!</p>
                </div>
            ) : (
                <div className="notes-grid">
                    {requests.map(req => (
                        <div key={req.id} className="request-card">

                            <div className="request-header">
                                <div className="flex gap-2">
                                    <span className="tag tag-grade">
                                        {req.grade}
                                    </span>
                                    <span className="tag tag-grade">
                                        {req.subject}
                                    </span>
                                </div>
                                {req.fulfilled ? (
                                    <span className="status-badge status-fulfilled">
                                        <CheckCircle size={14} /> Fulfilled
                                    </span>
                                ) : (
                                    <span className="status-badge status-open">
                                        <Clock size={14} /> Open
                                    </span>
                                )}
                            </div>

                            <h3 className="card-title mb-4">
                                {req.note_content}
                            </h3>

                            <div className="flex items-center gap-2 mb-6">
                                <div className="logo-icon" style={{ width: '24px', height: '24px', padding: 0, justifyContent: 'center', alignItems: 'center', fontSize: '12px' }}>
                                    {req.student_name.charAt(0)}
                                </div>
                                <span className="text-gray-500" style={{ fontSize: '0.875rem' }}>Requested by {req.student_name}</span>
                            </div>

                            <div className="card-footer">
                                <button
                                    onClick={() => handleUpvote(req.id, req.upvotes)}
                                    className="btn-icon"
                                    style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', width: 'auto' }}
                                >
                                    <ThumbsUp size={18} />
                                    <span>{req.upvotes} Boosts</span>
                                </button>

                                {!req.fulfilled && (
                                    <button
                                        onClick={onUploadClick}
                                        className="text-primary"
                                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: 'bold' }}
                                    >
                                        <Upload size={16} />
                                        I have this
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
